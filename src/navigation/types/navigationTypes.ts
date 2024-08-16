import {IPlaylist, ISong} from '../../zustand/store';

export type NavigatorParams = {
  Playlist: undefined;
  AddPlayList: undefined;
  AddSong: {
    playlistId: number;
  };
  PlaylistDetails: IPlaylist;
  MusicPlayer: ISong;
};
