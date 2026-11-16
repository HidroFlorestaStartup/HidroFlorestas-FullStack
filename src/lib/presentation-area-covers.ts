// Public, freely licensed illustrations for the three areas prepared for Hifro.
// Uploaded covers remain authoritative; these assets do not represent uploads.
export type PresentationAreaCover = Readonly<{
  src: string;
  author: string;
  source: string;
  license: string;
  licenseUrl: string;
}>;

const laboratoryId = "fe08991f-2a66-4873-8f5d-0c950f37bd6e";
const covers: Readonly<Record<string, PresentationAreaCover>> = {
  "d173fe48-cce8-413f-862f-3ab3cfaf7a25": {
    src: "/demonstracao-hifro/capas/aviacao.jpg",
    author: "Marcelo Cavallari",
    source: "https://commons.wikimedia.org/wiki/File:Attalea_speciosa_Itapecuru_1.JPG",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "d824d187-0cda-4bf4-85eb-2e408abf5815": {
    src: "/demonstracao-hifro/capas/leite.jpg",
    author: "Marcelo Cavallari",
    source: "https://commons.wikimedia.org/wiki/File:Attalea_speciosa_Itapecuru_2.JPG",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "0a141abb-ae2f-44a5-89e3-6d75da882e39": {
    src: "/demonstracao-hifro/capas/trizidela.jpg",
    author: "Johan Fredriksson",
    source: "https://commons.wikimedia.org/wiki/File:Rio_Itapecuru_no_Ros%C3%A1rio.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
};

export function getPresentationAreaCover(labId: string, areaId: string): PresentationAreaCover | null {
  return labId === laboratoryId && Object.hasOwn(covers, areaId) ? covers[areaId] : null;
}
