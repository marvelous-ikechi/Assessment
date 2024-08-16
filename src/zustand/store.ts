import {create} from 'zustand';

export interface ISong {
  id: number;
  title: string;
  duration: string;
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
}));
