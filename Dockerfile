FROM node:lts
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
ENV MONGO_URL="mongodb+srv://filzacamelliah:5j8R1een1N46umQ9@cluster0.blnulht.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0"
EXPOSE 8000
CMD ["npm", "start"]