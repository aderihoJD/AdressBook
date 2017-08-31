import Promise from 'bluebird';

function ControlDao({...collections}) {

    this.clearDb = () => {
        return Promise
            .all(Object.values(collections))
            .each((collection) => {
                return collection.remove({}).exec();
            })
    }

}

export default ControlDao;
