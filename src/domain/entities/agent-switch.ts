import { Entity } from '@/core/entities/entity'

type AgentSwitchProps = {
	chatId: string
	agentId: string
	startDate: Date
	endDate: Date
}

export class AgentSwitch extends Entity<AgentSwitchProps> {
	get chatId(): string {
		return this.props.chatId
	}

	get agentId(): string {
		return this.props.agentId
	}

	get startDate(): Date {
		return this.props.startDate
	}

	get endDate(): Date {
		return this.props.endDate
	}
}
