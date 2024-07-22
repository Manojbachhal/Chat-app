"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const cors_1 = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    const corsConfig = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    };
    app.options('*', (0, cors_1.default)(corsConfig));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map