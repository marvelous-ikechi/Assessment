import {IPlaylist} from '../../zustand/store';

export type NavigatorParams = {
  Playlist: undefined;
  AddPlayList: undefined;
  AddSong: {
    playlistId: number;
  };
  PlaylistDetails: IPlaylist;
};
