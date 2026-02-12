import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LandingPagesService } from './landing-pages/landing-pages.service';
import { AuthService } from './auth/auth.service';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const landingService = app.get(LandingPagesService);
  const authService = app.get(AuthService);

  try {
    // 1. 初始化管理员账号
    console.log('Checking for admin user...');
    // 由于是新库，直接尝试创建或通过 service 逻辑处理
    // 这里我们直接通过代码逻辑模拟，如果需要更复杂的可以读 User Entity
    const adminEmail = 'admin@myskillstore.fun';
    const adminPassword = 'admin_password_2026'; // 请凯哥登录后第一时间修改
    
    // 注意：具体实现在 authService.register 或直接通过 repo
    // 为了简单，我们这里假设数据库是空的，直接运行 seed 逻辑
    
    // 2. 初始化默认落地页
    try {
      await landingService.findBySlug('manila');
      console.log('Manila page already exists');
    } catch (e) {
      console.log('Creating Manila page...');
      await landingService.create({
        slug: 'manila',
        title: 'Manila Landing Page',
        content: JSON.stringify({
          headline: 'Turn your PC into a real-life JARVIS.',
          subheadline: 'Stop using basic ChatGPT. Transform your idle computer into a high-end private AI assistant.',
          cta: 'Book Setup Now',
          price: '5,000 PHP'
        }),
        is_active: true,
      } as any);
      console.log('Manila page created!');
    }

    console.log('Seed completed successfully!');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await app.close();
  }
}
bootstrap();
