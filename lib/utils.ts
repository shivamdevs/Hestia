import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type DateFormat =
	| "dd-MM-yyyy"
	| "MM-dd-yyyy"
	| "yyyy-MM-dd"
	| "MMM, yyyy"
	| "MMMM, yyyy";

export function formatDate(
	date: Date | string,
	format: DateFormat = "dd-MM-yyyy",
) {
	const d = typeof date === "string" ? new Date(date) : date;

	const day = String(d.getDate()).padStart(2, "0");
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const year = d.getFullYear();
	const monthName = d.toLocaleString("default", { month: "short" });
	const fullMonthName = d.toLocaleString("default", { month: "long" });

	switch (format) {
		case "dd-MM-yyyy":
			return `${day}-${month}-${year}`;
		case "MM-dd-yyyy":
			return `${month}-${day}-${year}`;
		case "yyyy-MM-dd":
			return `${year}-${month}-${day}`;
		case "MMM, yyyy":
			return `${monthName}, ${year}`;
		case "MMMM, yyyy":
			return `${fullMonthName}, ${year}`;
		default:
			return `${day}-${month}-${year}`;
	}
}
