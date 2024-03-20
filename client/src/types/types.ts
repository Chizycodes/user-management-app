export type UserDataType = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
	dateOfBirth: string;
	_id?: string;
};

export type DateFilterType = {
	startDate?: null | Date;
	endDate?: null | Date;
};
