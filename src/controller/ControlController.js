function ControlController({controlService}) {

    this.clearDb = (req, res, next) => {
        return controlService
            .clearDb()
            .then(() => {
                return res.status(204).end();
            })
            .catch(next);
    }
}

export default ControlController;
