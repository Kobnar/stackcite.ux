import { APIInterface, IndexResource } from 'api/actions'

export class ConfirmResource extends IndexResource {

    create (email) {
        return APIInterface.create(this.route(), { email })
    }

    update (confirmKey) {
        return APIInterface.update(this.route(), { key: confirmKey })
    }
}