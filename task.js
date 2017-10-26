var statusConstant = require('./constants').status;
var getTimeDiff = require('./utils').getTimeDiff;

function Task(content) {
    this.id = this.getNextId();
    this.status = statusConstant.TODO;
    this.content = content;
    this.createdAt = new Date();
    this.startAt = null; // Date
    this.doneAt = null; // Date
    this.timeSpent = null; //miliseconds number
    this.timeSpentString = null; //string
}

Task.prototype.getNextId = (function () {
    var id = 0;

    return function () {
        return id++;
    }
})();

Task.prototype.updateStatus = function(change) {
    this.status = change;
    //작업 시작/완료시각 저장
    switch (change) {
        case statusConstant.DOING:
            this.startAt = new Date();
            break;

        case statusConstant.DONE:
            this.doneAt = new Date();

            this.timeSpent = (this.startAt) ?
                this.doneAt.getTime() - this.startAt.getTime():
                this.doneAt.getTime() - this.createdAt.getTime();

            this.timeSpentString = (this.startAt) ?
                getTimeDiff(this.startAt, this.doneAt) :
                getTimeDiff(this.createdAt, this.doneAt);
            break;
    }
};

module.exports = Task;
