var settings = {
    testnet:true,
    from: 'newsletter@doichain.org',
    port:4010,
    host:"5.9.154.226",
    getSettings: function() {
        return this
    },
    setSettings: function (_settings) {
        this.testnet = _settings.testnet
        this.from = _settings.from
        this.port = _settings.port
        this.host = _settings.host
    }
}
export default settings
