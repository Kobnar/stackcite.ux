import { APIInterface, IndexResource } from '../../actions'

export class ConfirmResource extends IndexResource {

    create (email) {
        APIInterface.create(this.route(), { email })
    }

    update (confirmKey) {
        APIInterface.update(this.route(), { confirmKey })
    }
}