FROM node:20-bullseye-slim

USER root

RUN apt update -y && \
    apt upgrade -y && \
    apt install git -y

RUN ssh-keygen -t ed25519 -C "paolo.dev.projects@gmail.com" -N "" -f /root/.ssh/id_ed25519

RUN cat /root/.ssh/id_ed25519.pub >> /root/.ssh/authorized_keys

RUN git config --global user.name "paolochmprojects"

RUN git config --global user.email "paolo.dev.projects@gmail.com"

EXPOSE 5173