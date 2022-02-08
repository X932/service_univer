import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

const microserviceOptions: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://127.0.0.1:5672'],
    queue: 'university_queue',
    queueOptions: {
      durable: false,
    },
  },
};

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceOptions,
  );
  app.listen();

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
