const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 16
      }
    }
  };
  
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const extractTokenFromUrl = () => {
    const url_string = window.location.href;

    const url = new URL(url_string);
    return url.searchParams.get("token");
  }
  
  export { formItemLayout, tailFormItemLayout, extractTokenFromUrl };