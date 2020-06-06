interface User {
  id: string;
  image: string;
  name: string;
  places: Place[];
}

interface Place {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  location: { lat: number; lng: number };
}
