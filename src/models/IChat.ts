export interface INewChannels {
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  creator: {
    avatar: string;
    id: number;
    surname: string;
    name: string;
  };
  id: number;
  members: {
    id: number;
    surname: string;
    name: string;
    avatar: string;
  }[];
  title: string;
}

export interface IAllChannels {
  id: number;
  title: string;
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  creator: {
    id: number;
    role: number;
    name: string;
    surname: string;
    is_captain: boolean;
    avatar: string;
  };
  members: {
    id: number;
    name: string;
    surname: string;
    is_captain: boolean;
    avatar: string;
  }[];
}

export interface IAllMessages {
  id: number;
  channel: {
    id: number;
    title: string;
    creator: {
      id: number;
      name: string;
      surname: string;
      avatar: string;
    };
    members: {
      id: number;
      name: string;
      surname: string;
      avatar: string;
    }[];
  };
  author: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
  };
  parent: any;
  createdAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  updatedAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  isRead: boolean;
  content: string;
}
