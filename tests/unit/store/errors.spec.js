import { errors } from '@/store/modules/errors'

describe('getters', () => {

    const state = {
        error: {}
    }

    it('getError', () => {
        expect(errors.getters.getError(state)).toEqual({})
    })
})

describe('mutations', () => {
    it('setError', () => {
        const error = { msg: 'error' }

        const state = {
            error: {}
        }

        errors.mutations.setError(state, error)

        expect(state.error).toEqual({ msg: 'error' })
    })

    it('clearError', () => {
        const state = {
            error: { msg: 'error' }
        }

        errors.mutations.clearError(state)

        expect(state.error).toEqual({})
    })
})