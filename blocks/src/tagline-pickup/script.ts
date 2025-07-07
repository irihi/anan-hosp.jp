import apiFetch from '@wordpress/api-fetch';

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  link: string;
  sticky: boolean;
  categories: number[];
  tags: number[];
}

const typedApiFetch = <T>(options: any): Promise<T> => {
  return apiFetch(options) as Promise<T>;
};

window.addEventListener('DOMContentLoaded', async () => {
  const wrapper = document.getElementById('PickUp');

  const handleError = () => {
    if (wrapper) {
      const li = document.createElement('li');
      li.innerHTML = '<span>現在掲載できるお知らせはありません</span>';
      wrapper.appendChild(li);
    }
  }

  if (wrapper) {
    try {
      const posts = await typedApiFetch<WordPressPost[]>({ path: '/wp/v2/posts?sticky=true'});
      if (posts.length > 0) {
        posts.forEach(post => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${post.link}">${post.title.rendered}</a>`;
          wrapper.appendChild(li);
        });
      } else {
        handleError()
      }
    } catch {
      handleError();
    }
    
  }
}, {});