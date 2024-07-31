export const TASKS = {
    INITIATE_WORKFLOW       : 'initiateWorkflow',
    UPDATE_WORKFLOW_ACTIVITY: 'updateWorkflowActivity',
    CANCEL_WORKFLOW         : 'cancelWorkflow',
    REJECT_WORKFLOW         : 'rejectWorkflow'
}

export const STATUS = {

    PENDING                    : 'pending',
    WORKFLOW_INITIATED         : 'workflowInitiated',
    WORKFLOW_ACTIVITY_INITIATED: 'workflowActivityInitiated',
    WORKFLOW_ACTIVITY_UPDATED  : 'workflowActivityUpdated',
    WORKFLOW_CANCELED          : 'workflowCanceled',
    WORKFLOW_REJECTED          : 'workflowRejected',
    WORKFLOW_TIMEOUT           : 'workflowTimeOut'

}