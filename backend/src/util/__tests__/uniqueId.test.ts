import { UniqueID } from 'src/util/uniqueID'

describe('UniqueID', () => {
  it('[正常系]: 同一判定処理', () => {
    const id = UniqueID.reconstruct('1')
    const otherId = UniqueID.reconstruct('1')

    expect(id.equals(otherId)).toBeTruthy
  })
})
