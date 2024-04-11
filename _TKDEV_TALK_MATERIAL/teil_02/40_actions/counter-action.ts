"use server";

let counter = 0;
export async function increment(amount: number) {
	counter = counter + amount;
	console.log("New Counter", counter);
	return counter;
}
