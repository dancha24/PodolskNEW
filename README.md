# PidilskNEW

Лендинг «Миграционный центр в Подольске».

## Запуск в разработке (Docker)

```bash
docker build -t pidilsknew .
docker run --rm -p 64848:80 -v "$PWD:/usr/share/nginx/html" pidilsknew
```

Открыть: http://localhost:64848

## Страницы

- `/` — главная
- `/contacts/` — контакты
- `/zapis/` — предварительная запись
