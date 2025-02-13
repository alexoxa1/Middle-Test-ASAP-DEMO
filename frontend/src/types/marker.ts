export interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  comment: string;
}

export interface CreateMarkerDto {
  latitude: number;
  longitude: number;
  comment: string;
}

export interface UpdateMarkerDto {
  id: number;
  comment: string;
}
