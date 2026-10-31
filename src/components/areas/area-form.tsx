"use client";
import { useEffect, useReducer, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Crosshair, MapPin, Save } from "lucide-react";
import { AreaMap } from "./area-map";
import { areaDraftReducer, initialAreaDraft, ADDRESS_FIELDS } from "./area-geocoding-state";
import { coordinateValue, lookupReverseAddress } from "./reverse-address";
import styles from "./areas.module.css";
export function AreaForm({ laboratoryId }: { laboratoryId: string }) {
  const router = useRouter();
  const [draft, dispatch] = useReducer(areaDraftReducer, undefined, initialAreaDraft);
  const point = draft.point;
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [locating, setLocating] = useState(false);
  const inFlight = useRef(false);
  const locationRequest = useRef(0);
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  const latitude = coordinateValue(point.latitude, 90);
  const longitude = coordinateValue(point.longitude, 180);
  const select = (lat: string, lng: string) =>
    dispatch({ type: "point-edit", latitude: lat, longitude: lng });

  useEffect(() => {
    if (latitude === null || longitude === null) return;
    const revision = point.revision;
    const controller = new AbortController();
    let disposed = false;
    // Debounce typing, cancel earlier fetches and independently check the revision
    // in the reducer (for races where cancellation arrives too late).
    const delay = setTimeout(async () => {
      dispatch({ type: "lookup-start", revision });
      const timeout = setTimeout(() => controller.abort(), 5000);
      try {
        const address = await lookupReverseAddress(latitude, longitude, controller.signal);
        if (!disposed) dispatch({ type: "lookup-success", revision, address });
      } catch {
        if (!disposed) dispatch({ type: "lookup-failed", revision });
      } finally {
        clearTimeout(timeout);
      }
    }, 650);
    return () => {
      disposed = true;
      clearTimeout(delay);
      controller.abort();
    };
  }, [point.latitude, point.longitude, point.revision, latitude, longitude]);

  function locate() {
    if (locating) return;
    if (!navigator.geolocation) {
      setMessage(
        "Localização indisponível. Digite as coordenadas ou escolha no mapa.",
      );
      return;
    }
    setLocating(true);
    setMessage("");
    const request = ++locationRequest.current;
    const revision = point.revision;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!alive.current || request !== locationRequest.current) return;
        dispatch({
          type: "location",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          revision,
        });
        setLocating(false);
        setMessage(
          "Revise as coordenadas antes de confirmar. Edições manuais posteriores são preservadas.",
        );
      },
      () => {
        if (!alive.current || request !== locationRequest.current) return;
        setLocating(false);
        setMessage(
          "Não foi possível obter sua localização. Seus dados foram preservados; use o mapa ou digite as coordenadas.",
        );
      },
      { timeout: 10000, maximumAge: 0 },
    );
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    if (latitude === null || longitude === null) {
      setMessage(
        "Informe latitude entre -90 e 90 e longitude entre -180 e 180.",
      );
      return;
    }
    const form = new FormData(event.currentTarget);
    const data = {
      name: form.get("name"),
      latitude,
      longitude,
      municipality: form.get("municipality"),
      state: form.get("state"),
      landType: form.get("landType"),
      description: form.get("description"),
    };
    inFlight.current = true;
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch(`/api/laboratories/${laboratoryId}/areas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await response.json();
      if (!response.ok) {
        setMessage(body.error?.message ?? "Não foi possível salvar a área.");
        return;
      }
      router.push(
        `/dashboard/laboratories/${laboratoryId}/areas/${body.area.id}`,
      );
      router.refresh();
    } catch {
      setMessage(
        "Falha de conexão. Confira a listagem antes de tentar novamente.",
      );
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }
  const inputClass = styles.input;
  const labelClass = styles.label;
  return (
    <section className={styles.page}>
      <div className={styles.formIntro}>
        <Link
          aria-label="Voltar às áreas"
          href={`/dashboard/laboratories/${laboratoryId}/areas`}
          className={styles.back}
        >
          <ArrowLeft size={22} aria-hidden="true" />
        </Link>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>
            Novo ponto
          </p>
          <h1 className={styles.title}>
            Nova Área para Monitoramento
          </h1>
          <p className={styles.description}>
            Informe os dados e confirme um único ponto no mapa ou pelas
            coordenadas.
          </p>
        </div>
      </div>
      <form
        onSubmit={submit}
        className={styles.form + " " + styles.card}
      >
        <div className={styles.formGrid}>
          <div className={styles.fields}>
            <label className={labelClass}>
              Nome da área
              <input
                autoFocus
                required
                name="name"
                maxLength={100}
                placeholder="Ex.: Beira Rio"
                className={inputClass}
              />
            </label>
            <div className={styles.fieldGrid}>
              <label className={labelClass}>
                Latitude
                <input
                  aria-label="Latitude"
                  required
                  inputMode="decimal"
                  type="number"
                  min={-90}
                  max={90}
                  step="any"
                  placeholder="Ex.: -2.53073"
                  value={point.latitude}
                  onChange={(e) => select(e.target.value, point.longitude)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Longitude
                <input
                  aria-label="Longitude"
                  required
                  inputMode="decimal"
                  type="number"
                  min={-180}
                  max={180}
                  step="any"
                  placeholder="Ex.: -44.30682"
                  value={point.longitude}
                  onChange={(e) => select(point.latitude, e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <button
              type="button"
              disabled={locating}
              onClick={locate}
              className={styles.outline}
            >
              <Crosshair size={18} aria-hidden="true" />
              {locating ? "Obtendo localização…" : "Usar minha localização"}
            </button>
            <div className={styles.fieldGrid}>
              {ADDRESS_FIELDS.map((name) => (
                <label key={name} className={labelClass}>
                  {name === "municipality" ? "Município" : name === "state" ? "UF" : "CEP"}{" "}
                  <span className={styles.optional}>(opcional)</span>
                  <input
                    name={name}
                    aria-label={name === "municipality" ? "Município" : name === "state" ? "UF" : "CEP"}
                    value={draft.address[name]}
                    onChange={(event) => dispatch({ type: "address-edit", field: name, value: event.target.value })}
                    maxLength={name === "cep" ? 9 : 100}
                    placeholder={name === "cep" ? "Ex.: 65000-000" : undefined}
                    className={inputClass}
                  />
                </label>
              ))}
              <label className={labelClass}>
                Tipo de terreno <span className={styles.optional}>(opcional)</span>
                <input name="landType" maxLength={100} className={inputClass} />
              </label>
            </div>
            <p aria-live="polite" className={styles.mapHelp}>
              {draft.lookupStatus === "loading" && "Consultando endereço do ponto… "}
              {draft.lookupStatus === "ready" && "Sugestão recebida. Confira os campos antes de salvar. "}
              {draft.lookupStatus === "empty" && "Endereço não identificado para este ponto; você pode continuar. "}
              {draft.lookupStatus === "unavailable" && "Serviço de endereço indisponível; cadastro permitido pelas coordenadas. "}
              Município, UF e CEP podem ficar vazios ou ser corrigidos manualmente. Ao mudar o ponto,
              sugestões anteriores são retiradas; dados digitados permanecem para revisão.
            </p>
            <p className={styles.mapHelp}>
              O CEP é apenas uma referência nesta versão e não será gravado no cadastro.
              Município e UF informados são armazenados normalmente.
            </p>
            <label className={labelClass}>
              Descrição{" "}
              <span className={styles.optional}>(opcional)</span>
              <textarea
                name="description"
                maxLength={2000}
                rows={4}
                className={inputClass}
              />
            </label>
          </div>
          <div className={styles.mapColumn}>
            <div className={styles.mapTitle}>
              <MapPin size={18} aria-hidden="true" /> Selecione o ponto
            </div>
            <AreaMap
              latitude={latitude}
              longitude={longitude}
              onSelect={(lat, lng) => select(String(lat), String(lng))}
            />
            <p className={styles.mapHelp}>
              Clique no mapa ou digite as coordenadas. Nada será salvo antes da
              confirmação.
            </p>
          </div>
        </div>
        <div className={styles.formFooter}>
          <p
            role="status"
            aria-live="polite"
            className={styles.status}
          >
            {message}
          </p>
          <div className={styles.actions}>
            <Link
              href={`/dashboard/laboratories/${laboratoryId}/areas`}
              className={styles.outline}
            >
              Cancelar
            </Link>
            <button
              disabled={submitting}
              className={styles.button}
            >
              <Save size={18} aria-hidden="true" />
              {submitting ? "Salvando…" : "Confirmar ponto e cadastrar"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
