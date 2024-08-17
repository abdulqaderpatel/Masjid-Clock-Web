export default interface User {
    id: number,
    name: string,
    email: string,
    city: string,
    address: string,
    state: string,
    isVerified: boolean,
    masjidId?: number,
    type: string
}
