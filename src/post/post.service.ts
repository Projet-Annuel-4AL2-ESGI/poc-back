import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { GetPostDto } from './dto/get-post.dto';
import { Like } from '../likes/entities/like.entity';
import { GetPostLikesDto } from './dto/get-post-likes.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  async findAll() {
    const posts = await this.postRepository.find();
    const getPosts: GetPostDto[] = [];
    for (const post of posts) {
      const getPost = await this.mapPostToGet(post);
      getPosts.push(getPost);
    }
    return getPosts;
  }

  async findAllLikes(id: number) {
    const posts = await this.postRepository.find({
      order: { id: 'DESC' },
    });
    const likes = await this.likeRepository.find({
      where: { userId: id },
    });
    const getPostsLikes: GetPostLikesDto[] = [];
    for (const post of posts) {
      const getPostLike = await this.mapPostLikeToGet(post);
      for (const like of likes) {
        if (like.postId == getPostLike.id) {
          getPostLike.liked = true;
        }
      }
      getPostsLikes.push(getPostLike);
    }
    return getPostsLikes;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne(id);
    return await this.mapPostToGet(post);
  }

  async findExo() {
    const posts = await this.postRepository.find({ where: { type: 'exo' } });
    const postExo: GetPostDto[] = [];
    for (const post of posts) {
      const posttemp = await this.mapPostToGet(post);
      postExo.push(posttemp);
    }
    return postExo;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.save({
      id: id,
      type: updatePostDto.type,
      title: updatePostDto.title,
      description: updatePostDto.description,
      image: updatePostDto.image,
    });
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }

  async mapPostToGet(post: CreatePostDto) {
    let userId = null;
    let userName = null;
    let userImage = null;
    if (post.userId != null) {
      const user = await this.userRepository.findOne(post.userId);
      userId = user.id;
      userName = user.username;
      userImage = user.image;
    }
    const getPost: GetPostDto = {
      id: post.id,
      type: post.type,
      userId: userId,
      userName: userName,
      title: post.title,
      description: post.description,
      likes: post.likes,
      userImage: userImage,
      image: post.image,
      exoId: post.exoId,
    };
    return getPost;
  }

  async mapPostLikeToGet(post: CreatePostDto) {
    let userId = null;
    let userName = null;
    let userImage = null;
    if (post.userId != null) {
      const user = await this.userRepository.findOne(post.userId);
      userId = user.id;
      userName = user.username;
      userImage = user.image;
    }
    const getPostLikes: GetPostLikesDto = {
      id: post.id,
      type: post.type,
      userId: userId,
      userName: userName,
      title: post.title,
      description: post.description,
      likes: post.likes,
      userImage: userImage,
      liked: false,
      image: post.image,
      exoId: post.exoId,
    };
    return getPostLikes;
  }
}
