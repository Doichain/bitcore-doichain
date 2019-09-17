import settings from "./settings"

const getUrl = () =>{

    if(settings.host===undefined && settings.port === undefined) return "" //for development purposes (proxy,cors)
    else{
        let ssl = settings.ssl?settings.ssl:false
        let port = settings.port?settings.port:3000
        let host = settings.host?settings.host:"localhost"
        let protocol = "http://";
        if(ssl===true) protocol = "https://";
        return protocol+host+":"+port+"/";
    }
}

export default getUrl