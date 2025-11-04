"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taggable = exports.TargetType = exports.TaggableType = void 0;
const typeorm_1 = require("typeorm");
var TaggableType;
(function (TaggableType) {
    TaggableType["GOAL"] = "goal";
    TaggableType["KPI"] = "kpi";
    TaggableType["REPORT"] = "report";
    TaggableType["TASK"] = "task";
    TaggableType["NOTIFICATION"] = "notification";
})(TaggableType || (exports.TaggableType = TaggableType = {}));
var TargetType;
(function (TargetType) {
    TargetType["ACTIVITY"] = "activity";
    TargetType["LINE_ITEM"] = "line_item";
})(TargetType || (exports.TargetType = TargetType = {}));
let Taggable = class Taggable {
};
exports.Taggable = Taggable;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Taggable.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Taggable.prototype, "taggableId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TaggableType }),
    __metadata("design:type", String)
], Taggable.prototype, "taggableType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Taggable.prototype, "targetId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TargetType }),
    __metadata("design:type", String)
], Taggable.prototype, "targetType", void 0);
exports.Taggable = Taggable = __decorate([
    (0, typeorm_1.Entity)('taggables')
], Taggable);
//# sourceMappingURL=taggable.entity.js.map