class LocalStorage {
	private static instance: LocalStorage;
	private _cache = CacheService.getUserCache();

	static getInstance(): LocalStorage {
		if (!LocalStorage.instance) {
			LocalStorage.instance = new LocalStorage();
		}

		return LocalStorage.instance;
	}

	set(id: number, data: object, expireIn: number = 1500): void {
		if (this._cache) {
			this._cache.put(`STORE_${id}`, JSON.stringify(data), expireIn);	
		}
	}

	get(id: number): object | null {
		if (this._cache) {
			const data = this._cache.get(`STORE_${id}`);
			return data && JSON.parse(data);
		}

		return null;
	}
}

const localStorage = LocalStorage.getInstance();

export { localStorage };
