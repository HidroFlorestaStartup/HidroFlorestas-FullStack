export type AreaSummaryDto = { id:string; name:string; latitude:number; longitude:number; municipality:string|null; state:string|null;cover?:{revision:number;hasImage:boolean;featureEnabled:boolean} };
export type AreaDetailDto = AreaSummaryDto & { landType:string|null; description:string|null; createdAt:string; laboratory:{id:string;name:string;status:"ACTIVE"|"INACTIVE"}; readOnly:boolean };
