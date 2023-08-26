export default class StatusMessage {
  static readonly HTTP_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };

  static readonly SERVER_ERRORS = {
    internal_error: 'Internal Error',
    rate_limit_reached: 'Rate limt exceeded, please try again later some time.',
    validation_error: 'Validation Error',
    queryDate: 'Both start date and end date are required',
    queryDateFormat: 'Date should be in YYYY/MM/DD format',
    queryStartDateBetweenEndDate: 'Start date should be less than end date',
    querySort: 'Both sortBy and sort order are required',
    db_error: 'Database connection issues',
    no_information_provided: 'No Information provided to update',
    invalid_id: 'Invalid Insight Id',
    add_failed: 'Failed to add new insight',
    get_failed: 'Failed to fetch insights',
    update_failed: 'Failed to update the insight',
    delete_failed: 'Failed to delete the insight',
    insight_not_found: 'Insight record not found',
  };

  static readonly ERROR_CODES = {
    internal_error_msg: [1001, StatusMessage.SERVER_ERRORS.internal_error, 500],

    insights: {
      information_not_provided_msg: [1002, StatusMessage.SERVER_ERRORS.update_failed, 400],
      validation_error_msg: [1003, StatusMessage.SERVER_ERRORS.validation_error, 400],
      add_db_error_msg: [1004, StatusMessage.SERVER_ERRORS.add_failed, 500],
      get_db_error_msg: [1005, StatusMessage.SERVER_ERRORS.get_failed, 500],
      update_db_error_msg: [1006, StatusMessage.SERVER_ERRORS.update_failed, 500],
      delete_db_error_msg: [1007, StatusMessage.SERVER_ERRORS.delete_failed, 500],
      get_invalid_id_msg: [1008, StatusMessage.SERVER_ERRORS.get_failed, 400],
      update_invalid_id_msg: [1009, StatusMessage.SERVER_ERRORS.update_failed, 400],
      delete_invalid_id_msg: [1010, StatusMessage.SERVER_ERRORS.delete_failed, 400],
      insight_not_found_msg: [1011, StatusMessage.SERVER_ERRORS.insight_not_found, 500],
    },
  };

  static readonly SERVER_SUCCESS = {
    insights: {
      data_added: 'insight data saved successfully',
      data_fetched: 'insights data fetched successfully',
      data_updated: 'insight data updated successfully',
      data_deleted: 'insight data delete successfully',
    },
  };

  static readonly DB_ERRORS = {
    uniqueConstantError: 'MongoDBUniqueConstraintError',
    validationError: 'MongoDBValidationError',
    accessDeniedError: 'MongoDBAccessDeniedError',
    MongoDBConnectionError: 'MongoDBConnectionError',
  };

  static readonly DB_LOGS = {
    DB_CONNECTED_SYNC_SUCCESS_MSG: '####### Database connected and synced successfully #######',
  };

  constructor() {}
}
