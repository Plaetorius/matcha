import { differenceInYears } from 'date-fns';

export function calculteAge(dob: Date) {
	return differenceInYears(new Date(), dob);
}