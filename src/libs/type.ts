// 캐릭터 타입
export enum CHAR_TYPE {
	PACKY,
	GHOST,
}

// 맵 interface
export interface mapInterface {
	key: string;
	src: string;
}

// 캐릭터 interface
export interface charInterface {
	key: string;
	name: string;
	src: string;
}

// game Type
export enum GAME_TYPE {
	SOLO = 'SOLO',
	DUO = 'DUO',
	MULTI = 'MULTI',
}
