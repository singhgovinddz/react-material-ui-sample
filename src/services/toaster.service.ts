class ToasterService {
    static _ref: any = null; // reference of any variable
    constructor() { }

    show(message: any): void {
        if(ToasterService._ref && !ToasterService._ref.state.open) {
            ToasterService._ref.setState({ ...ToasterService._ref.state, open: true, message: message });   
        }
    }
}

export default ToasterService;