# PidilskNEW

Лендинг «Миграционный центр в Подольске».

## Запуск в разработке (Docker)

```bash
docker build -t pidilsknew .
docker run --rm -p 5978:80 -v "$PWD:/usr/share/nginx/html" pidilsknew
```

Открыть: http://localhost:5978

## Страницы

- `/` — главная
- `/contacts/` — контакты
- `/zapis/` — предварительная запись
