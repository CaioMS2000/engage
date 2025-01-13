import { randomUUID } from 'node:crypto'

type AgentSwitchProps = {
	chatId: string
	agentId: string
	startDate: Date
	endDate: Date
}

export class AgentSwitch {
	public id: string
	public chatId: string
	public agentId: string
	public startDate: Date
	public endDate: Date

	constructor(props: AgentSwitchProps, id?: string) {
		const { chatId, agentId, startDate, endDate } = props
		this.id = id ?? randomUUID().toString()
		this.chatId = chatId
		this.agentId = agentId
		this.startDate = startDate
		this.endDate = endDate
	}
}
