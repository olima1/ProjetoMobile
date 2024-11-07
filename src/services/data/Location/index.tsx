import { api } from '../../api'
export interface ILocation {
    latitude?: number
    longitude?: number
}

export interface IResponseLocation {
    id: number
    user_id: number
    latitude: number
    longitude: number
    created_at: string
    update_at: string
    user:{
        id:number
        name:string
        email:string
    }
}

class LocationData {
    index() {
        return api.get<IResponseLocation[]>('/location')
    }
    store(data: ILocation) {
        console.log(data)
        return api.post('/location', data)
    }
}
export default new LocationData()