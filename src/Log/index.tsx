import {FC, useEffect, useState} from 'react'
import CodeMirror, {IReactCodemirror} from '@uiw/react-codemirror'
import 'codemirror/keymap/sublime'
import 'codemirror/theme/monokai.css'

export interface ILog extends IReactCodemirror {
	polling?: number
	request?: (params?: any) => Promise<any>
}

let timer: NodeJS.Timeout | null = null

const Log:FC<ILog> = ({polling, request, ...rest}) => {
	const [value, setValue] = useState()

	useEffect(() => {
		if(!polling) return
		if(!request) return
		timer = setInterval(async () => {
			const {data} = await request()
			setValue(data)
		}, polling)
		return () => {
      timer && clearInterval(timer)
      timer = null
    }
	}, [polling, request])

	return <CodeMirror {...rest} value={value}/>
}

export default Log