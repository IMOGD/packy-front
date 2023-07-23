// 캐릭터 타입
export enum CHAR_TYPE {
	PACKY = 'PACKY',
	GHOST = 'GHOST',
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

// 캐릭터 종류
export enum CHARACTER {
	PACKY_BLUE = 'packy_blue',
	PACKY_GREEN = 'packy_green',
	PACKY_PINK = 'packy_pink',
	PACKY_RED = 'packy_red',
	PACKY_SKY = 'packy_sky',
	PACKY_YELLOW = 'packy_yellow',
	GHOST_BLUE = 'ghost_blue',
	GHOST_GREEN = 'ghost_green',
	GHOST_ORANGE = 'ghost_orange',
	GHOST_PINK = 'ghost_pink',
	GHOST_PURPLE = 'ghost_purple',
	GHOST_RED = 'ghost_red',
	GHOST_SKY = 'ghost_sky',
	GHOST_YELLOW = 'ghost_yellow',
}
