function ControlService({controlDao}) {

    this.clearDb = () => {
        return controlDao.clearDb();
    };
}

export default ControlService;
