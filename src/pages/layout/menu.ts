export interface IMenuNav {
    title: string
    uri?: string
    children?: IMenuNav[]
}

export const menuNav: IMenuNav[] = [
    {
        title: 'mapbox',
        uri: "/root/mapbox",
    },
]
