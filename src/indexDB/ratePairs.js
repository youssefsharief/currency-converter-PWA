import idb from "idb";

const collectionName = 'currencyPair'
const promise = idb.open('currency-conveter-pairs', 1, (x) => x.createObjectStore(collectionName, { keyPath: "pairs" }));


export const idbCurrencyRate = {
	getPair: (pair = "USD_EUR") => promise.then((x) => x.transaction(collectionName).objectStore(collectionName).get(pair)),
	count: (pair = "USD_EUR") => promise.then((x) => x.transaction(collectionName).objectStore(collectionName).count(pair)),
	saveToDb: (contents = { pairs: "", rate: "" }) => promise.then((x) => {
		const tx = x.transaction(collectionName, "readwrite");
		tx.objectStore(collectionName).put(contents);
		return tx.complete
	})
}



