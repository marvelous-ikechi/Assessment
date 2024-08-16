import {create} from 'zustand';

export interface ISong {
  id: number;
  title: string;
  duration: number;
}

export interface IPlaylist {
  id: number;
  title: string;
  songs?: ISong[];
}

export interface IPlaylistStore {
  playlists: IPlaylist[];
  addPlaylist: (playlist: IPlaylist) => void;
  addSongToPlaylist: (playlistId: number, song: ISong) => void;
  setSelectedPlayList: (playlist: IPlaylist) => void;
  selectedPlayList: IPlaylist | null;
  currentTrack: ISong | null;
  setCurrentTrack: (song: ISong) => void;
  trackQueue: ISong[] | null;
  setTrackQueue: (song: ISong[]) => void;
  isCurrentlyPlaying: boolean;
  setIsCurrentlyPlaying: (isPlaying: boolean) => void;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
}

export const usePlaylistStore = create<IPlaylistStore>(set => ({
  playlists: [],
  addPlaylist: playlist =>
    set(state => ({playlists: [...state.playlists, playlist]})),
  addSongToPlaylist: (playlistId, song) =>
    set(state => ({
      playlists: state.playlists.map(playlist =>
        playlist.id === playlistId
          ? {
              ...playlist,
              songs: [...(playlist.songs || []), song],
            }
          : playlist,
      ),
    })),
  selectedPlayList: null,
  setSelectedPlayList: (playlist: IPlaylist) =>
    set({selectedPlayList: playlist}),
  currentTrack: null,
  setCurrentTrack: (song: ISong) => set({currentTrack: song}),
  trackQueue: [],
  setTrackQueue: (song: ISong[]) => set({trackQueue: song}),
  isCurrentlyPlaying: false,
  setIsCurrentlyPlaying: (isPlaying: boolean) =>
    set({isCurrentlyPlaying: isPlaying}),
  isPaused: false,
  setIsPaused: (isPaused: boolean) => set({isPaused: isPaused}),
}));
