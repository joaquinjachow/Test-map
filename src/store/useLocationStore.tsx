import create from 'zustand';

interface LocationState {
    latitude: number | null;
    longitude: number | null;
    setLocation: (lat: number, lon: number) => void;
}

interface LocationStore extends LocationState {
    setLocation: (lat: number, lon: number) => void;
}

const useLocationStore = create<LocationStore>((set) => {
    const initialState: LocationStore = {
        latitude: null,
        longitude: null,
        setLocation: (lat, lon) => {
            try {
                set({ latitude: lat, longitude: lon })
            } catch (error) {
                console.error(error)
            }
        },
    };
    return initialState;
});

export default useLocationStore;
