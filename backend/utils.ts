import { NextResponse } from 'next/server';

export const RECORD_NOT_FOUND = 404;
export const INVALID_INPUT = 417;
export const HTTP_SUCCESS = 200;

export class AppError extends Error {
	constructor(
		message: string,
		public status: number,
		public err?: {},
	) {
		super(message);
	}
}

export const buildErrResp = (error: unknown, defErrMsg: string) => {
	if (error instanceof AppError) {
		return NextResponse.json(
			{ message: error.message, error: error.err },
			{ status: error.status },
		);
	} else {
		const errMsg = error instanceof Error ? error.message : 'Error occured';
		return NextResponse.json(
			{ message: errMsg, error: { error } },
			{ status: 500 },
		);
	}
};
export const isValid = (s: string | undefined) => {
	return s && s.trim().length > 0;
};
