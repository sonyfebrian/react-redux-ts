
export class BrowserUtility {

    static setValue(key:any,value:any) {
        window.localStorage.setItem(key,value)
    }

    static getValue(key:any) {
        window.localStorage.getItem(key)
    }

    static setObj(key:any,obj:any) {
        window.localStorage.setItem(key,JSON.stringify(obj))
    }

    static getObj(key:any) {
        const user = window.localStorage.getItem(key);
        if (user) {
            return JSON.parse(user)
        }
        return null;
    }

    static clearAll() {
        window.localStorage.clear()
    }

    static clearKey(key:any) {
        window.localStorage.removeItem(key)
    }
}