import {getData, ResponseData} from './rest'

import axios, {AxiosResponse} from 'axios'
jest.mock('axios')

const mockAxios = axios as jest.Mocked<typeof axios>


test('HTTPのステータスコードが200の時はデータを返す', async () => {
	mockAxios.get.mockResolvedValue({status: 200, data: [{id: 1, text: "test result"}]})
	const response = await getData(1)

	expect(mockAxios.get).toHaveBeenCalledWith('https://example.com', {
		params: {id:1}
	})
	expect(response).toStrictEqual({status: 200, data: [ {
		id:1,
		text: "test result"
	}]})
})

test('HTTPのステータスコードが404の時はからの配列を返す', async() => {
	mockAxios.get.mockResolvedValue({status: 404})
	const response = await getData(1)
	expect(mockAxios.get).toHaveBeenCalledWith('https://example.com', { params: { id: 1 }})
	expect(response).toStrictEqual({status: 404, data:[]})
})