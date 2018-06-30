import idb from "idb";

const collectionName = 'currencyItems'
const dbPromise = idb.open("currency-list", 1, (upgradeDb) => {
	upgradeDb.createObjectStore(collectionName, { keyPath: "id" });
});



export const idbCurrencyList = {
	getAll: () => dbPromise.then((db) => db.transaction(collectionName).objectStore(collectionName).getAll()),
	count: () => dbPromise.then((db) => db.transaction(collectionName).objectStore(collectionName).count()),
	saveToDb: (data) => dbPromise.then((db) => {
		const tx = db.transaction(collectionName, "readwrite");
		Object.keys(data).forEach((key) => {
			tx.objectStore(collectionName).put(data[key]);
		})
	})
}