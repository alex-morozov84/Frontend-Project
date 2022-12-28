import { StateSchema } from '@/app/providers/StoreProvider'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { getProfileData } from './getProfileData'

describe('getProfileData.test', () => {
  test('should return data', () => {
    const data = {
      username: 'admin',
      first: 'Александр',
      lastname: 'Морозов',
      country: Country.Russia,
      age: 38,
      currency: Currency.RUB,
      city: 'Санкт-Петербург',
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    }
    expect(getProfileData(state as StateSchema)).toEqual(data)
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})
